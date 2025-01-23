import React, { useState, useEffect } from 'react';
import '../assets/App.css'
import FormVenda from '../components/FormVenda';
import { Venda } from '../interfaces/Venda';

function AppVenda() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Venda de Combustível</h1>

      <FormVenda/>
    </div>
  );
}

export default AppVenda;
