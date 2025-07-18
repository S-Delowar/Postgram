import React, { createContext, useState } from 'react';
import NavigationBar from './NavigationBar';
import Toaster from './Toaster';

export const Context = createContext();

const Layout = (props) => {

    const [toaster, setToaster] = useState({
        title: "", message: "", type: "", show: false
    })

    return (
        <Context.Provider value={{ toaster, setToaster }}>
            <>
            <NavigationBar />
            <div className='container m-5'>{props.children}</div>
        
             <Toaster
          title={toaster.title}
          message={toaster.message}
          type={toaster.type}
          showToast={toaster.show}
          onClose={() => setToaster({ ...toaster, show: false })}
        />
        </>
        </Context.Provider>
    );
};

export default Layout;