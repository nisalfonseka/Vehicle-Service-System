app.use('/vehicles', vehiclesRoute);


import vehiclesRoute from './routes/vehiclesRoute.js';



<Route path='/' element={<Home />} />
      <Route path='/vehicles/create' element={<CreateVehicle />} />
      <Route path='/vehicles/details/:id' element={<ShowVehicle />} />
      <Route path='/vehicles/edit/:id' element={<EditVehicle />} />
      <Route path='/vehicles/delete/:id' element={<DeleteVehicle />} />



import CreateVehicle from './pages/CreateVehicles';
import ShowVehicle from './pages/ShowVehicle';
import EditVehicle from './pages/EditVehicle';
import DeleteVehicle from './pages/DeleteVehicle';