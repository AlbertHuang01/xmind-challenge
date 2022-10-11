import ReactDOM from "react-dom";
import { SearchForm } from './index';
import * as context from './context'

jest.mock('./contant')

describe('<SearchForm />', () => {
  it('renders without crashing', () => {
    jest.spyOn(context, 'useAppContext').mockImplementation(() => {
      return {
        categoryList: []
      } as unknown as context.ContextProps
    })

    const div = document.createElement('div');
    ReactDOM.render(<SearchForm />, div);

    const elMonths = div.querySelectorAll('input[id="months"]');
    expect(elMonths).toHaveLength(1)

    const elCategory = div.querySelectorAll('input[id="category"]');
    expect(elCategory).toHaveLength(1)

    const elSearchButton = div.querySelectorAll('[data-testid="search-button"]');
    expect(elSearchButton).toHaveLength(1)
  });
})
