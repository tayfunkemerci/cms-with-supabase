import React from 'react';
import withAuth from "@/app/hoc/withAuth";

const MyAccount = () => {
    return (
        <div>
            hesabım
        </div>
    );
};

export default withAuth(MyAccount);