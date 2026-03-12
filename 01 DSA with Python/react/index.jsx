

const [items, setItems] = useState([1, 2, 3]);

const reverse = () => {
    setItems([...items].reverse());
}
