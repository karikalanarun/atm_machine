import React from "react";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Header = () => {
    return <div>
        <Breadcrumb>
            <BreadcrumbItem active>ATM Machine</BreadcrumbItem>
        </Breadcrumb>
    </div>
}

export default Header