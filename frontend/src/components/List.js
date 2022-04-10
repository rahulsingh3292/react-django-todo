

const List = (props)=>{
  
  return (<>
                <tr className="fw-normal">
               <td className="align-middle">
               
                  <input type="checkbox" onClick={()=>props.markComplete(props.id,props.isCompleted?false:true,props.title)} checked={props.isCompleted}/>
                  
               </td>
                  <td className="align-middle">
                    <span >{props.title}</span >
                  </td>
                  <td className="align-middle">
                    <h6 className="mb-0"><span className={"badge"}>{props.isCompleted?"Completed":"Pending"}</span></h6>
                  </td>
                  <td className="align-middle">
                  
                   <a onClick={()=>props.clickEdit(props.id,props.title,props.isCompleted)} title="Edit"><i className="fas fa-pencil fa-lg text-warning me-3"></i></a>
                    
                  
                    <a onClick={()=>props.remove(props.id)}><i className="fas fa-trash-alt fa-lg text-warning"></i></a>
                 
                    
                  </td>
                </tr>
  </>);
}
export default List ;