import Header from "./Header"
const BannerTitle = ({ img = "", title = "", subTitle = "" }) => {
    const style = {
        backgroundImage: "linearGradient(#00000000,#00000040)",
    }
    return (
        <>
        <Header></Header>
        <div className="min-h-screen flex items-center  relative overflow-hidden">
            <div className="container mx-auto z-10">
                <div className="md:w-4/5 lg:w-8/12 text-white ">
                    <span className="text-base uppercase">{subTitle}</span>

                    <h1 className="font-bold text-5xl md:text-6xl leading-tight ">{title}</h1>
                </div>
            </div>

            <img
                className="w-full h-full absolute object-cover filter brightness-75 "
                src={"http://localhost/storage/pages/" + img}
                alt={title}
                style={style}
            />
        </div>
        
        </>
    )
}

export default BannerTitle
