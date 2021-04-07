import React, { useRef, SyntheticEvent } from 'react';

interface FilterProps {
    onFilterChange: (a: string) => void
}


const Filter = (props: FilterProps) => {

    const parent = useRef<HTMLDivElement>(null)
    const filterClick = (ev: SyntheticEvent) => {
        let childs = parent.current?.children
        if (childs)
            for (let i = 0; i < childs.length; i++) {
                childs.item(i)?.classList.replace('filter-btn-selected', 'filter-btn')
            }
        ev.currentTarget.className = "filter-btn-selected"
        if (ev.currentTarget.textContent)
            props.onFilterChange(ev.currentTarget.textContent)
    }
    const filters: Array<string> = ['source-over', 'source-in', 'source-atop', 'source-out', 'destination-over', 'destination-atop', 'destination-in', 'destination-out', 'lighter', 'copy', 'xor']

    return (
        <div ref={parent} className="filter-content" style={{ display: "flex", alignContent: "space-evenly", position: "absolute", backgroundColor: "white", width: "85vw", height: "4vw", borderRadius: "12px", transform: "translate(7%,15%)" }}>
            <h2 style={{ transform: "translate(22%,-17%)", color: "#73737A", paddingRight: "4vw" }}>Filters</h2>
            {
                filters.map(f => (
                    <button key={f} className="filter-btn" onClick={ev => filterClick(ev)}>{f}</button>
                ))
            }


        </div>
    );
}

export default Filter

