const SearchInput = (props) => {
    const {value, onChange, placeholder} = props;
    return <input type="text" value={value} onChange={onChange} placeholder={placeholder}/>
}

export default SearchInput;