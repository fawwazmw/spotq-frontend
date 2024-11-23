import Image from 'next/image';
async function fetchCafeData() {
    try {
        // Fetch data from Strapi API
        const [cafesResponse, roomsResponse, facilitiesResponse] = await Promise.all([
            fetch('http://localhost:1337/api/cafes'),
            fetch('http://localhost:1337/api/rooms'),
            fetch('http://localhost:1337/api/facilities'),
        ]);

        // Convert the response to JSON
        const cafes = await cafesResponse.json();
        const rooms = await roomsResponse.json();
        const facilities = await facilitiesResponse.json();

        // Process data to generate desired format
        const productData = cafes.data.map(cafe => {
            // Find matching rooms and facilities for each cafe
            const cafeRooms = rooms.data.filter(room => room.cafe_id === cafe.id);
            const cafeFacilities = facilities.data.filter(facility => facility.cafe_id === cafe.id);

            return {
                id: cafe.id.toString(),
                img: cafe.image ? cafe.image.url : '', // Provide image URL if available
                img_big: cafe.image ? cafe.image.url : '', // Provide large image URL if available
                title: cafe.name,  // Cafe name
                category: cafe.category ? cafe.category.name : 'No Category',  // Cafe category
                price: cafe.price ? cafe.price.toString() : '0', // Provide price if available
                tag: cafe.tag || 'default', // Provide tag if available
                rooms: cafeRooms.map(room => ({
                    room_name: room.name, // Room name
                    capacity: room.capacity,  // Room capacity
                })),
                facilities: cafeFacilities.map(facility => facility.name), // Available facilities in the cafe
            };
        });

        // Export the formatted data
        const exportData = `const productData = ${JSON.stringify(productData, null, 4)}; export default productData;`;
        return exportData;  // Return the data in a format suitable for export
    } catch (error) {
        console.error('Error fetching cafe data:', error);
        return `const productData = []; export default productData;`; // Return empty data in case of an error
    }
}

// Function to save the data to a .js file dynamically
async function saveProductData() {
    const productDataString = await fetchCafeData();

    // Save the data to productData.js file
    const blob = new Blob([productDataString], { type: 'application/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'productData.js';  // File name for download
    link.click();
}

// Trigger the function to download the data after it is fetched and processed
saveProductData();