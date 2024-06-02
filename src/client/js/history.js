document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/history')
        .then(response => response.json())
        .then(purchases => {
            const historyContainer = document.getElementById('purchase-history');
            
            purchases.forEach(purchase => {
                const purchaseElement = document.createElement('div');
                purchaseElement.classList.add('purchase-item');
                purchaseElement.innerHTML = `
                    <h3>Purchase ID: ${purchase.id}</h3>
                    <p>Date: ${new Date(purchase.date).toLocaleString()}</p>
                    <ul>
                        ${purchase.items.map(item => `<li>${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
                    </ul>
                    <p>Total: $${purchase.total}</p>
                    
                    <hr>
                `;
                historyContainer.appendChild(purchaseElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});