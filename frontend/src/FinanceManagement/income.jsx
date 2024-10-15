import React, { useState } from 'react';
import jsPDF from 'jspdf';


const ingredientsList = [
    { id: 1, name: 'Flour', costPerUnit: 34.5 },
    { id: 2, name: 'Sugar', costPerUnit: 35.5 },
    { id: 3, name: 'Butter', costPerUnit: 100.0 },
    { id: 4, name: 'Eggs', costPerUnit: 50.0 },
    { id: 5, name: 'Yeast', costPerUnit: 22.6 },
];

const IngredientRequest = () => {
    const [selectedIngredientId, setSelectedIngredientId] = useState('');
    const [quantities, setQuantities] = useState({});
    const [totalCost, setTotalCost] = useState(0);
    const [managerEmail, setManagerEmail] = useState('');

    const handleSelectChange = (e) => {
        setSelectedIngredientId(e.target.value);
    };

    const addIngredient = () => {
        if (selectedIngredientId && !quantities[selectedIngredientId]) {
            setQuantities({
                ...quantities,
                [selectedIngredientId]: 0,
            });
        }
    };

    const handleQuantityChange = (id, value) => {
        const quantity = parseFloat(value) || 0;
        const newQuantities = {
            ...quantities,
            [id]: quantity,
        };
        setQuantities(newQuantities);

        // Recalculate total cost
        const newTotalCost = Object.entries(newQuantities).reduce((acc, [ingredientId, qty]) => {
            const ingredient = ingredientsList.find(ing => ing.id === parseInt(ingredientId));
            return acc + (ingredient.costPerUnit * qty);
        }, 0);
        setTotalCost(newTotalCost);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        const emailBody = Object.entries(quantities)
            .map(([ingredientId, qty]) => {
                const ingredient = ingredientsList.find(ingredient => ingredient.id === parseInt(ingredientId));
                return `${ingredient.name}: ${qty} units, Total Cost: Rs.${(ingredient.costPerUnit * qty).toFixed(2)}`;
            })
            .join('%0D%0A'); // Encodes newline characters for email body

        window.location.href = `mailto:${managerEmail}?subject=Ingredient Request&body=Total Cost: Rs.${totalCost.toFixed(2)}%0D%0A%0D%0A${emailBody}`;
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Ingredient Request Report", 20, 10);
        doc.text(`Total Cost: Rs.${totalCost.toFixed(2)}`, 20, 20);

        Object.entries(quantities).forEach(([ingredientId, qty], index) => {
            const ingredient = ingredientsList.find(ingredient => ingredient.id === parseInt(ingredientId));
            doc.text(`${ingredient.name}: ${qty} units, Cost per unit: Rs.${ingredient.costPerUnit.toFixed(2)}, Total: Rs.${(ingredient.costPerUnit * qty).toFixed(2)}`, 20, 30 + (index * 10));
        });

        doc.save('ingredient-request-report.pdf');
    };

    return (
        <div className="ingredient-request-container">
            <h2>Request Ingredients</h2>
            <label htmlFor="ingredient-select">Select Ingredient:</label>
            <select id="ingredient-select" value={selectedIngredientId} onChange={handleSelectChange}>
                <option value="">-- Select Ingredient --</option>
                {ingredientsList.map(ingredient => (
                    <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name} (Rs.{ingredient.costPerUnit}/unit)
                    </option>
                ))}
            </select>
            <button onClick={addIngredient} className="add-ingredient-btn">Add Ingredient</button>

            <form onSubmit={handleEmailSubmit}>
                {Object.entries(quantities).map(([id, quantity]) => {
                    const ingredient = ingredientsList.find(ingredient => ingredient.id === parseInt(id));
                    return (
                        <div key={id} className="ingredient-item">
                            <label>{ingredient.name}</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) => handleQuantityChange(id, e.target.value)}
                            />
                            <span>Cost per unit: Rs.{ingredient.costPerUnit.toFixed(2)}</span>
                        </div>
                    );
                })}
                <div className="total-cost">
                    <strong>Total Cost: Rs.{totalCost.toFixed(2)}</strong>
                </div>

                <div className="email-section">
                    <label htmlFor="manager-email">Inventory Manager Email:</label>
                    <input
                        type="email"
                        id="manager-email"
                        placeholder="Enter Manager's Email"
                        value={managerEmail}
                        onChange={(e) => setManagerEmail(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Send Email</button>
            </form>

            <button onClick={generatePDF} className="generate-report-btn">Generate Report</button>
        </div>
    );
};

export default IngredientRequest;
