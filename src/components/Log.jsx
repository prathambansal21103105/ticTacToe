const Log=({gameTurns})=>{
    return(
        <ol id="log">
            {gameTurns.map((element)=>(
                <li key={`${element.square.row}${element.square.col}`}>
                    {element.player} selected {element.square.row},{element.square.col}
                </li>
            ))}
        </ol>
    );
}
export default Log;