// Thank You Functions
function showThankYouMessage(orderDetails) {
    const thanksTitle = document.getElementById('thanksTitle');
    
    if (currentUser && thanksTitle) {
        thanksTitle.textContent = `Thank You ${currentUser.name} for Your Order!`;
    }
}

//  print receipt functions
document.addEventListener('DOMContentLoaded', function() {
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', function() {
            alert('Print receipt');
             window.print();
        });
    }
});