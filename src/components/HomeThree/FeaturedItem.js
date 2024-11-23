import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const FeaturedItem = () => {
   const itemsData = [
      {
         id: 1,
         name: 'Lowokwaru',
         itemNumber: '20 Cafes+'
      },
      {
         id: 2,
         name: 'Dau',
         itemNumber: '10 Cafes+'
      },
      {
         id: 3,
         name: 'Batu',
         itemNumber: '30 Cafes+'
      },
      {
         id: 4,
         name: 'Idjen',
         itemNumber: '14 Cafes+'
      },
   ]
   return (
      <>
         <section className="overlay-top">
            <div className="container">
               <div className="row">
                  {
                     itemsData.map(item => {
                        return <div key={item.id} className="col-lg-3 col-md-3 col-sm-6">
                           <div className="mt_cat shadow">
                              <div className="mt_cat_caps">
                                 <h3 className="mt_cat_title">
                                    <Link href="/product"><a >{item.name}</a></Link>
                                 </h3>
                                 <span>{item.itemNumber}</span>
                              </div>
                           </div>
                        </div>
                     })
                  }
               </div>
            </div>
         </section>
      </>
   );
};

export default FeaturedItem;