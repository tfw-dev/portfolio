export default function PortfolioProject({item}) {

    return(
        <div>
            <p className="text-[12px] mb-2">{item.title}</p>
            <p className="text-[12px] mb-2">{item.description}</p>
            <p className="text-[12px]">{item.timeframe}</p>
        </div>
    )
}