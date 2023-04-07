import { useEffect, useState } from 'react'
import _ from 'lodash';
import './Tree.css'

function Tree({myKey, data}) {
    /*
    data:
        {}
        []
        string
        boolean
    */
    const isArray = data instanceof Array
    const isObj = !isArray && data instanceof Object

    const [rendered, setRendered] = useState(false);
    useEffect(() => {
      setRendered(false)
      setTimeout(() => {
        setRendered(true)
      }, 500)
    }, [data]);
    
    if (!isArray && !isObj) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 5, paddingRight: 5, backgroundColor: rendered ? '#242424' : '#777', borderRadius: 5}} className='bgTrans'>
          { myKey != null ? <div style={{marginRight: 10}}>{`${myKey}:`}</div> : null }
          <div>
            {
              data === true ?
              <span style={{color: '#6899CC'}}>{'true'}</span>:
              data === false ?
              <span style={{color: '#6899CC'}}>{'false'}</span>:
              typeof data === "string" ?
              <span style={{color: "#A3864F"}}>{'"'+data+'"'}</span> :
              data
            }
          </div>
        </div>
      )
    }
  
    const isEmpty = _.isEmpty(data)
    if (isEmpty) {
      return (
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
          { myKey != null ? <div style={{marginRight: 10}}>{`${myKey}:`}</div> : null }
          { isArray ? <div>{'[]'}</div> : null }
          { isObj ? <div>{'{}'}</div> : null }
        </div>
      )
    }
  
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
          { myKey != null ? <div style={{marginRight: 10}}>{`${myKey}:`}</div> : null }
          { isArray ? <div>{'['}</div> : null }
          { isObj ? <div>{'{'}</div> : null }
        </div>
        <div style={{paddingLeft: 30, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingRight: 5}}>
          {
            _.map(data, (obj, key) => 
              <Tree key={key} data={obj} myKey={key} />
            )
          }
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 5, paddingRight: 5}}>
          { isArray ? <div>{']'}</div> : null }
          { isObj ? <div>{'}'}</div> : null }
        </div>
      </div>
    )
  }

  export default Tree;