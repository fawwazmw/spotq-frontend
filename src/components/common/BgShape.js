import Image from 'next/image';
import React from 'react';

const BgShape = () => {
    return (
        <>
            <div className="bg-shape">
                <Image src="/assets/img/shape/shape-1.png" width={1920} height={582} alt="" priority={true} />
            </div>
        </>
    );
};

export default BgShape;