import bgFooter from '@/assets/image/bgFooter.png';
import { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigator = useNavigate();

  const [cartData, setCartData] = useState([]);

  const h
              </table>
            ) : (
              <h2>Không có mặt hàng nào trong giỏ hàng</h2>
            )
          }
        </div>

        {
          cartData?.length ? (
            <div className='card-footer p-4 p-lg-5 border-top-0 d-flex justify-content-end'>
              <button className='btn btn-info btn-lg' style={{ marginRight: '8%' }}  onClick={handleCheckout}> Checkout</button>
            </div>
             <div className='card-footer p-4 p-lg-5 border-top-0 d-flex justify-content-end'>
             <button className='btn btn-info btn-lg' style={{ marginRight: '8%' }}  onClick={handleCheckout}> Checkout</button>
           </div>

<div className='card-footer p-4 p-lg-5 border-top-0 d-flex justify-content-end'>
<button className='btn btn-info btn-lg' style={{ marginRight: '8%' }}  onClick={handleCheckout}> Checkout</button>
</div>
 <div className='card-footer p-4 p-lg-5 border-top-0 d-flex justify-content-end'>
 <button className='btn btn-info btn-lg' style={{ marginRight: '8%' }}  onClick={handleCheckout}> Checkout</button>
</div>
 <div className='card-footer p-4 p-lg-5 border-top-0 d-flex justify-content-end'>
 <button className='btn btn-info btn-lg' style={{ marginRight: '8%' }}  onClick={handleCheckout}> Checkout</button>
</div>

          ) : null
        }
      </div>
    </>
  );
}

export default CartPage;
