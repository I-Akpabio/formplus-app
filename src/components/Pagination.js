
const Pagination = ({ page, total, limit, changePage }) => {
    const totalPage = total % limit > 0 
        ? (Math.floor(total / limit) + 1) : Math.floor(total / limit); 

    const previousAction = () => { 
        if(page - 1 < 1) return;
        changePage(page - 1) 
    };

    const nextAction = () => { 
        if(page + 1 > totalPage) return;
        changePage(page + 1) 
    };

    const backImgStyle = page === 1 ? {display: 'none'} : {};
    const forwardImgStyle = page === totalPage ? {display: 'none'} : {};


    return (
       <div className="flex-grid-thirds pagination" style={{marginTop: "1.0rem"}}>
           <img onClick={nextAction} className="Absolute-Center" style={forwardImgStyle} src="https://www.vippng.com/png/detail/3-39259_right-arrow-right-arrow-icon-svg.png" />
           <img onClick={previousAction} className="Absolute-Center rotate" style={backImgStyle} src="https://www.vippng.com/png/detail/3-39259_right-arrow-right-arrow-icon-svg.png" />

            <div className="col">
                <button className="btn" onClick={previousAction}>Previous</button>
            </div>

            <div className="col">
                <span className="main-page">{page}</span>
                <span>/</span>
                <span className="total-page">{totalPage}</span>
            </div>

            <div className="col">
                <button className="btn" onClick={nextAction}>Next</button>
            </div>
       </div>
    );
}

export default Pagination;