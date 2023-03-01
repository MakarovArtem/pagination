import Select from '../components/select/Select.jsx'
import Input from '../components/input/Input.jsx'

export default function Filter({filter, setFilter}) {
  
  return(
  <article>
    <Input
      placeholder='Search items...'
      value={filter.query}
      onChange={event => setFilter({...filter, query: event.target.value})}
    />
    <Select
      value={filter.sort}
      selectCallback={selectedSortType => setFilter({...filter, sort: selectedSortType})}
      defaultName='Sort by..'
      options={[{value: 'title', name: 'Title'}, {value: 'body', name: 'Description'}]}
    />
  </article>
  )
}