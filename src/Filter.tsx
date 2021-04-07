import React, { useRef, SyntheticEvent } from 'react';

interface FilterProps {
    onFilterChange: Function
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
        props.onFilterChange(ev.currentTarget.textContent)
    }

    return (
        <div ref={parent} className="filter-content" style={{ display: "flex", alignContent: "space-evenly", position: "absolute", backgroundColor: "white", width: "85vw", height: "4vw", borderRadius: "12px", transform: "translate(7%,15%)" }}>
            <h2 style={{ transform: "translate(22%,-17%)", color: "#73737A", paddingRight: "4vw" }}>Filters</h2>

            <button className="filter-btn" onClick={ev => filterClick(ev)}> src-in </button>
            <button className="filter-btn" onClick={ev => filterClick(ev)}> src-over </button>
            <button className="filter-btn" onClick={ev => filterClick(ev)}> dest-in </button>
            <button className="filter-btn" onClick={ev => filterClick(ev)}> dest-over </button>
            <button className="filter-btn" onClick={ev => filterClick(ev)}> lighter </button>
            <button className="filter-btn" onClick={ev => filterClick(ev)}> lighten </button>
            <button className="filter-btn" onClick={ev => filterClick(ev)}> darker </button>

        </div>
    );
}

export default Filter