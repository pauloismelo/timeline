function EditName({name, handleName, handleBlur, handleKeyDown}) {


    return ( 
        <>
        <input
            type="text"
            value={name}
            onChange={(e) => handleName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ width: "100%" }}
            />
        </>
     );
}

export default EditName;