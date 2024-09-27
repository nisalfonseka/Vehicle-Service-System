import React from 'react';
import { Link } from 'react-router-dom';
import ManagerHeader from '../../components/managerHeader';
import ItemList from './InventoryItems';



const managerHome = () => {

    return(
        <div>
        
        <ManagerHeader />
       
        <table class="table table-hover">
        </table>
        
        </div>
    );
}


export default managerHome;