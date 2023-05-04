import useTodo from "../../customHooks/useTodo"
import styles from '../../styles/Todo.module.css'


type todotype = {
    input: string,
    id: string,
}

const Todo = () => {


    //   ------------------------------------------------------------------------------------------
    const {
        input,
        data,
        // loader,
        toggle,
        setinput,
        cancel,
        save,
        update,
        onEditHandler,

    } = useTodo()
    //   -------------------------------------------------------------------------------------------------------



    //   -------------------------------------------return started----------------------------------------------

    return (
        <div className={styles.centeraligin}>
        <div className={styles.card}>
        <div className={styles.card2} >
          <h1 className={styles.textcentre}>ToDo list</h1>
          <br />
          <div className={styles.inputgroup}>
            <input
             className={styles.input}
              onChange={(e) => { setinput(e.target.value) }}
              placeholder="add todo"
              type="text"
              value={input} />
            {toggle ? <button onClick={save} className={styles.buttonsubmit} >Add</button> :
              <button
               onClick={onEditHandler}
                className={styles.buttonsubmit} >edit</button>
            }
          </div>
          <br/>
          <div>
                   {data.map((item) => {
              return (
                <div key={item.id}>
                  <p className={styles.para}>{item.input}</p>
                  <span className={styles.buttoncentre}>
                  <button className={styles.button1} onClick={() => cancel(item)}>delete</button>
                  
                  <button className={styles.button3}
                    onClick={() => update(item)}
                    >
                      update</button>
                  </span>
                  <br />
                  <br />
                  <br />
                </div>
              )
            })}
            <hr  className={styles.hrline1}/>
            <br/>
            
            
  
          </div>
  
  
  
  
  
          </div>
        </div>
      </div>
    )
}

export default Todo