import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');
  const [dirtyFields, setDirty] = useState(
    Object.fromEntries( 
      Object.entries(inputs).map(([key, value]) => [key, false] ))
    );

  useEffect(() => {
    // This function runs when the things we are watching change.
  }, [initialValues]);

  // state:
  // {
  //     name: 'wes',
  //     description: 'nice shoes',
  //     price: 1000
  // }

  function handleBlur(e: any) {    
    console.log("DirtyFields: ", dirtyFields);

    let { value, name, type } = e.target;
    //console.log(value, name, type);

    const result = (initial[name] !== value)     

    console.log("Initial: ", initial[name], "Current: ", value, "Result: ", result);
    
    setDirty({...dirtyFields, [name]: result});
  }

  function handleChange(e: any) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({ 
        // copy the existing state
        ...inputs,
        [name]: value,                      
    });  
    // isDirty(name);  
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  function isDirty(fieldName:string) {    
    //console.log(initial[fieldName], inputs[fieldName], initial[fieldName] === inputs[fieldName]);
    return initial[fieldName] === inputs[fieldName];    
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    dirtyFields,
    handleChange,
    resetForm,
    clearForm,
    handleBlur
    // isDirty
  };
}

// Form Validation Tutorial:
// https://felixgerschau.com/react-hooks-form-validation-typescript/#demo


