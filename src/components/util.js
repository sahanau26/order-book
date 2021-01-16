const calculateTotal = (list) => {
    const totalList = []
    list.reduce((acc, ele) => {
      const { price, count, amount } = ele
      const total = Math.abs(parseFloat(acc.amount) + parseFloat(amount)).toFixed(3)
      const obj = {
        price,
        count,
        amount,
        total
      }
      if (acc.price) {
        totalList.push({ ...acc, total: acc.amount })
      }
      totalList.push(obj)
      return {
        amount: total
      }
    })
    return totalList
  }
  
  export const createTableData = (data) => {
    const buyObj = {}
    const saleObj = {}
    data.map((ele) => {
      const obj = {
        price: ele[0],
        count: ele[1],
        amount: Math.abs(ele[2]).toFixed(3)
      }
      ele[2] > 0 ? buyObj[obj.price] = obj : saleObj[obj.price] = obj
      return obj
    })
  
    const buySorted = calculateTotal(Object.values(buyObj).reverse().slice(0, 25))
    const saleSorted = calculateTotal(Object.values(saleObj).reverse().slice(0, 25))
    const split = {
      buy: buySorted,
      sale: saleSorted,
      buyObj,
      saleObj
    }
    return split
  }
  
  export const udpateTable = (value, { buyObj, saleObj }) => {
    const cloneBuyObj = {
      ...buyObj
    }
    const cloneSaleObj = {
      ...saleObj
    }
    const obj = {
      price: value[0],
      count: value[1],
      amount: Math.abs(value[2]).toFixed(3)
    }
    value[2] > 0 ? cloneBuyObj[obj.price] = obj : cloneSaleObj[obj.price] = obj
  
    const buySorted = calculateTotal(Object.values(cloneBuyObj).reverse().slice(0, 25))
    const saleSorted = calculateTotal(Object.values(cloneSaleObj).reverse().slice(0, 25))
    const result = {
      buy: buySorted,
      sale: saleSorted,
      buyObj: cloneBuyObj,
      saleObj: cloneSaleObj
    }
    return result
  }
  