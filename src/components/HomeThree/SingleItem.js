import Image from 'next/image';
import React from 'react';

const SingleItem = ({img,img_format = 'png'}) => {
   return (
         <div className="product_new_item">
            <a href="#">
               {/* <div className="site-preview" data-preview-url="assets/img/icon/thumb/preview/preview-1.png"
                  data-item-cost="39.00" data-item-category="WordPress" data-item-author="Theme_Pure" 
                  ata-alt="Markite - Digital Marketplace WordPress Theme"></div> */}
               <Image src={`/assets/img/icon/thumb/icon/th-${img}.${img_format}`} width={80} height={80} alt=""/>
            </a>
         </div>
   );
};

export default SingleItem;