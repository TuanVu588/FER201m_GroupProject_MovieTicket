
import Banner from '@/components/Banner';

function CheckoutPage() {
  

  const rowHTML = 
    <tr className='border-bottom' >
      <td className='d-flex align-items-center'>
        <div
          className='fw-bold'
          style={{  fontWeight: '500', color: 'red', marginRight: '5px'}}>
          tittle
        </div>
      </td>
      <td className='text-end fw-bold'>10000</td>
    </tr>
 

  return (
    <>
      <Banner title={'Checkout Page'} />
      <div className='row' style={{ width: '70%', margin: '3% auto' }}>
        <div className='col-xl-7'>
          <div className='card mb-4'>
            <div className='card-header'>Billing Details</div>
            <div className='card-body'>
              <form>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='fullName'>
                    Full Name
                  </label>
                  <input className='form-control' id='fullName'  name='fullName' type='text' placeholder='Enter your full name'
                    value={formData.full_name}  onChange={handleInputChange}/>
                </div>
                <div className='row gx-3 mb-3'>
                  <div className='col-md-6'>
                    <label className='small mb-1' htmlFor='phone'>
                      Phone number
                    </label>
                    <input className='form-control' id='phone'  name='phone' type='text' placeholder='Enter your full name'
                    value={formData.phone}  onChange={handleInputChange}/>
                  </div>
                  <div className='col-md-6'>
                    <label className='small mb-1' htmlFor='email'>
                      Email address
                    </label>
                    <input className='form-control' id='email'  name='email' type='text' placeholder='Enter your full name'
                    value={formData.email}  onChange={handleInputChange}/>
                  </div>
                </div>
                <div className='mb-3'>
                  <label className='small mb-1' htmlFor='address'>
                    Address
                  </label>
                  <textarea className='form-control' id='address' name='address'  type='text'
                    placeholder='Enter your address' value={formData.address}  onChange={handleInputChange}/>
                </div>

                <button className='btn btn-info' type='button' onClick={handleCheckout}>Place Order</button>
              </form>
            </div>
          </div>
        </div>
        <div className='col-xl-5'>
          <div className='card mb-4 mb-xl-0'>
            <div className='card-header'>Your Order</div>
            <div className='card-body'>
              <table className='table table-borderless mb-0'>
                <thead className='border-bottom'>
                  <tr className='small text-uppercase text-muted'>
                    <th scope='col'>Product</th>
                    <th className='text-end' scope='col'>
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rowHTML}
                  <tr>
                    <td>
                      <div className='fw-bold'>TOTAL</div>
                    </td>
                    <td className='text-end font-weight-bold'>2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
