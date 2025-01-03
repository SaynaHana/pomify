function StatCard(props) {
    return(
        <div className="stat-card">
            <h2>{ props.title }</h2>
            <p>{ props.value }</p>
        </div>
    );
}

export default StatCard;