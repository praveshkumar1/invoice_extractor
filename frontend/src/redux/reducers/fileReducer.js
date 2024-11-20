const initialState = {
    data: null,
    status: 'idle', // Can be 'idle', 'uploading', 'success', 'failed'
  };
  
  const fileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FILE_DATA':
        return { ...state, data: action.payload };
      case 'SET_FILE_UPLOAD_STATUS':
        return { ...state, status: action.payload };
      default:
        return state;
    }
  };
  
  export default fileReducer;
  