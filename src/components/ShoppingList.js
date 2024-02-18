import React, { useState, useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  // fetch data from db.json server 

  useEffect(() =>{

    fetch('http://localhost:4000/items')
    .then(resp => resp.json())
    .then(data => setItems(data))
  },[])

  // Update Item
  function handleUpdateItem(updatedItem){
const updatedItems = items.map((item) =>{
  if (item.id === updatedItem.id){
    return updatedItem;
  } else{
    return item;
  }});

setItems(updatedItems)
    
  }
  // Add new data to the DOM
  function handleAddItem(newItem) {
    
    setItems([...items, newItem]);
  }
  // Remove deleted item from the DOM
  function handleDeletedItem (deletedItem){
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className= "ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem = {handleUpdateItem} onDeleteItem = {handleDeletedItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
