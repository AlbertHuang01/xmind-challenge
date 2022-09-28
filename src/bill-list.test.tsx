import { render } from "@testing-library/react"
import { renderHook } from "@testing-library/react-hooks"
import BillList from "./bill-list"
import { appContextInit } from "./context"
import { APP_DATA } from "./main"

describe('bill-list',()=>{
  it('bill-list snapshot',async()=>{
    const {waitForNextUpdate,result}=renderHook(()=>appContextInit())
    await waitForNextUpdate()

    const wrapper = ({ children }) => <APP_DATA.Provider value={result.current}>{children}</APP_DATA.Provider>
    const {baseElement}=render(<BillList/>,{wrapper})
    expect(baseElement.querySelector('.ant-table-tbody')).toMatchSnapshot()
  })
})
