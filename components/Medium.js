export default function Medium({mymedium}) {
   
    return (
        <div>
            <h2>Medium</h2>
            <button>Medium feed</button>
            {mymedium && (
            // <ul>
            // { mymedium.map((item,index) => {
            //     return (
            //     <li key={index}>
            //         <p>{ item.author }</p>
            //         <p>{ item.title } </p>
            //     </li>
            //     );
            // })}
            // </ul>
            <div>
            { mymedium.map((item,index) => {
                return (
                <div key={index}>
                    <p>item.author: { item.author }</p>
                    <p>item.title :{ item.title } </p>
                </div>
                );
            }
            )}
            </div>
        )}
      </div>
    )
  }