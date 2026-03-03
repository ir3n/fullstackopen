const PhonebookForm = ({ formData, onInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="number">Number: </label>
          <input
            id="number"
            type="text"
            name="number"
            value={formData.number}
            onChange={onInputChange}
            required
          />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PhonebookForm;
