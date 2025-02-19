const validateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start) || isNaN(end)) {
      throw new Error('Formato de data inválido. Use YYYY-MM-DD');
    }
    
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      throw new Error('O intervalo máximo permitido é de 7 dias');
    }
  };
  
  module.exports = { validateDateRange };