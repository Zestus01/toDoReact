import {useState, useRef, useEffect} from 'react'
import './css/styles.css'

export default function App(){
    // Setting the initial state values and such
    const [page, setPage] = useState('All');
    const [toDoList, setToDoList] = useState([]);
    const [compList, setCompList] = useState([]);
    const [listCount, setListCount] = useState(0);
    // Helper variables for local storage
    let listObj;
    let count;
    window.localStorage.getItem('count') 
        ? count = window.localStorage.getItem('count') 
        : count = 0;
    // Setting the lists to the local storage values are in local storage
    useEffect( () => {
        if(count !== 0){
            setToDoList(JSON.parse(window.localStorage.getItem('toDoList')));
            // eslint-disable-next-line
            listObj = JSON.parse(window.localStorage.getItem('toDoList'));
            // eslint-disable-next-line
            count = listObj.length;
            setListCount(count);
            window.localStorage.setItem('count', count);
        }
    }, [])
    // Making the Initial call for the components 
    return(
        <div className='text-center mx-auto justify-content-center'>
            <h3 className='text-success fw-bold'> TO DO LATER? ALWAYS LATER </h3>
            <Header  
                list={toDoList} 
                setListCount={setListCount} 
                listCount={listCount} 
                setToDoList={setToDoList}
            />
            <ListItems 
                listCount={listCount} 
                toDoList={toDoList}
                setToDoList={setToDoList} 
                setListCount={setListCount} 
                setCompList={setCompList} 
                compList={compList} 
                page={page}
                count={listCount}
            />
            <Footer 
                setPage={setPage} 
                listCount={listCount}
                page={page}
            />
        </div>
    )
}

// Deals with inputting the tasks and parsing into local storage
function Header(props){
    // Helper variable for calculating count after clear done
    let deleCount = 0;
    const ref = useRef(null);
    // If a key is pushed down this gets called, this only runs if the key is enter
    function handleEnter(e){
        // If the key that's down is enter or the button got clicked
        if(e.key === 'Enter' || e.type === 'click'){
            let boxValue = ref.current.value;
            if(boxValue === ''){
                return;
            }
            // Makes the boxValue into a task object. 
            let taskObj = {isDone: false, task: boxValue, ID: new Date()};
            // Adding to the state, and local storage to the values
            props.setToDoList([...props.list, taskObj]);
            props.setListCount(props.listCount + 1);
            window.localStorage.setItem('toDoList', JSON.stringify([...props.list, taskObj]));
            window.localStorage.setItem('count', props.listCount + 1);
            ref.current.value = '';
        }
    }
    return  (
        <>
            <button
                className='btn btn-success mx-1'
                onClick={handleEnter}
                >
                    ADD TASK
            </button>
            <input 
                ref={ref} 
                id='input' 
                type='text' 
                placeholder='TO DO NEVA' 
                onKeyDown={handleEnter}
            />
            <button 
                className='btn btn-danger mx-2' 
                onClick={() => {
                    props.setToDoList(
                        props.list.filter(
                            task => {
                                    if(task.isDone){
                                        deleCount++;
                                        return false;
                                    }
                                    return true;
                            }
                        )
                    );
                    props.setListCount(props.listCount - deleCount);
                    window.localStorage.setItem('count', props.listCount - deleCount);
                    window.localStorage.setItem(
                        'toDoList', JSON.stringify(
                            props.list.filter(
                                task => {
                                        if(task.isDone){
                                            return false;
                                        }
                                        return true;
                                }
                            )
                        )
                    )   
                }}>
                    CLEAR DONE
            </button>
            <button 
                className='btn btn-danger mx-2' 
                onClick={() => {
                    props.setToDoList([]);
                    props.setListCount(0);
                    window.localStorage.clear();
                }}>
                    CLEAR ALL
            </button>
        </>
    )
}
// Responsible for rendering the list of tasks
function ListItems(props){
    // Helper variable to rerender the page after things change. 
    const [rerender, setRerender] = useState(true);
    if(!props.toDoList){
        return;
    }
    // Sets a helper array for tasks. 
    let tasks = props.toDoList;
    // Checks which page should be rendered
    if(props.page !== 'All'){
        let filterVar = props.page === 'Completed' ? true : false;
        tasks = props.toDoList.filter((item) => item.isDone === filterVar);
    }
    return (
        <div 
            id='taskSection' 
            className=' 
                row 
                container-fluid 
                d-flex 
                overflow-auto 
                justify-content-center'
        >
            {tasks.map( (item, index) => 
                <div 
                    className='
                        m-2 
                        d-flex 
                        flex-row
                        col-8 
                        justify-content-center
                        text-center 
                        container-fluid' 
                    id={item.task + index} 
                    key={item.task + index}
                > 
                    <input 
                        className="form-check-input" 
                        onClick={() => {
                            item.isDone = !item.isDone
                            window.localStorage.setItem('toDoList', JSON.stringify(props.toDoList));
                            setRerender(!rerender)
                        }}
                        type="checkbox" 
                        defaultChecked={item.isDone} 
                        id={item.task + index}
                    />
                        <div className={
                            item.isDone 
                                ? "text-muted text-decoration-line-through text-white" 
                                : 'text-white'}
                            id={item.task + index + 'T'}
                        >
                            {item.task}
                        </div>
                        <button 
                            className='
                                btn 
                                px-1 
                                mx-1 
                                btn-outline-danger 
                                text-center 
                                col-1' 
                            onClick={() => {
                                props.setToDoList(
                                    props.toDoList.filter(
                                        task => 
                                            task.ID !== item.ID
                                    )
                                );
                                props.setListCount(props.count - 1);
                                window.localStorage.setItem('count', props.count - 1);
                                window.localStorage.setItem(
                                    'toDoList', JSON.stringify(
                                        props.toDoList.filter(
                                            task => task.ID !== item.ID)
                                        )
                                    );
                            }}
                        >
                            X
                        </button>
                </div> 
            )}
        </div>
    )
}

function Footer(props){
    let sections = ['To-Do', 'Completed', 'All']
    return(
        <div 
            className='
                position-absolute 
                top-100 
                start-50 
                translate-middle 
                text-bg-light 
                container 
                col 
                d-flex 
                justify-content-center 
                text-muted'
        >
            <p> Tasks Left: {props.listCount} &nbsp; </p>
            {sections.map( (item) => { 
                return (
                <div 
                    key={item}
                    id={item} 
                    className={item === props.page ? 'fw-bold' : ''}  
                    onClick={()=> props.setPage(item)}
                > 
                &nbsp; {item} &nbsp; 
                </div>
            )})}
        </div>
    )
}
// Extra line for github
