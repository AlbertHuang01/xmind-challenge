import { render } from "@testing-library/react"
import SearchForm from "./search-form"

describe('search-form',()=>{
  it('snapshot',()=>{
    const {baseElement}=render(<SearchForm/>)
    expect(baseElement).toMatchSnapshot()
  })
})
