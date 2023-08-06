// items.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItems,
  addItems,
  updateItem,
  deleteItem,
  editItem
} from "./reducer";

const Items = () => {
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector((state) => state.post);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [qty, setQty] = useState("");
  const [photo, setPhoto] = useState("");
  const [editingItemId, setEditingItemId] = useState(null); // Track the item being edited
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const saveItemData = () => {
    dispatch(addItems({ name, price, details, qty, photo }));
    setName("");
    setPrice("");
    setDetails("");
    setQty("");
    setPhoto("");
  };

  const editItemData = (itemId) => {
    setEditingItemId(itemId);
    const item = items.find((item) => item.id === itemId);
    //While clicking edit button one by one without update input data not changed for pravalika as its some field are empty
    setName(item.name ? item.name : "");
    setPrice(item.price ? item.price : "");
    setDetails(item.details ? item.details : "");
    setQty(item.qty ? item.qty : "");
    setPhoto(item.photo ? item.photo : "");
    // setName(item.name);
    // setPrice(item.price);
    // setDetails(item.details);
    // setQty(item.qty);
    // setPhoto(item.photo);
    // dispatch(editItem(itemId));
  };

  const updateItemData = () => {
    if (editingItemId !== null) {
      dispatch(
        updateItem({
          id: editingItemId,
          itemData: { name, price, details, qty, photo }
        })
      );
      // Reset form inputs and editingItemId
      setName("");
      setPrice("");
      setDetails("");
      setQty("");
      setPhoto("");
      setEditingItemId(null);
    }
  };

  const deleteItemData = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Photo"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Quantity"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <br />
      <br />
      <button onClick={saveItemData}>Save</button>
      <button onClick={updateItemData}>Update</button>
      <br />
      <br />
      {items.map((item, index) => (
        <div>
          {item.name}
          <button onClick={() => deleteItemData(item.id)}>Delete</button>
          <button onClick={() => editItemData(item.id)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default Items;
