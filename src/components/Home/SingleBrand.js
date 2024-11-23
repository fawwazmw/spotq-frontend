import Image from 'next/image';

const SingleBrand = ({image}) => {
    return (
        <>
            <div className="brand__thumb">
                <Image src={`/assets/img/icon/thumb/icon/th-60.png`} width={80} height={80} alt="" />
            </div>
        </>
    );
};

export default SingleBrand;