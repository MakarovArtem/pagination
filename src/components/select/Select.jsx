export default function Select({options, defaultName, value, selectCallback}) {

  return(
    <select
      value={value}
      onChange={(event) => selectCallback(event.target.value)}
    >
      <option disabled>{defaultName}</option>
      {
        options.map((option) => {
          <option key={crypto.randomUUID()} value={option.value}>
            {option.name}
          </option>
        })
      }
    </select>
  )
}