import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import { FaShoppingCart, FaCircle } from 'react-icons/fa';
import { colors } from '../../utils/theme'
const { primary } = colors


function CartLink(props) {
  const [renderClientSideComponent, setRenderClientSideComponent] = useState(false)
  useEffect(() => {
    setRenderClientSideComponent(true)
  }, [])
//   let { context: { numberOfItemsInCart = 0 }} = props
  return (
    <div>
      <div className="fixed
      sm:top-53 right-24 desktop:right-flexiblemargin
      top-40 z-10">
        <div className="flex flex-1 justify-end pr-4 relative">
        <Badge count={1} style={{marginRight: 10}}>
            <a href="/user/cart" className="head-example" style={{marginRight:-10, color: '#667777'}}>
              <ShoppingCartOutlined style={{fontSize: 30}} />
            </a>
       </Badge>
          {/* {
            renderClientSideComponent && numberOfItemsInCart > Number(0) && (
              <FaCircle color={primary} size={12} suppressHydrationWarning />
            )
          } */}
        </div>
      </div>
    </div>
  )
}

// function CartLinkWithContext(props) {
//   return (
//     <ContextProviderComponent>
//       <SiteContext.Consumer>
//         {
//           context => <CartLink {...props} context={context} />
//         }
//       </SiteContext.Consumer>
//     </ContextProviderComponent>
//   )
// }

export default CartLink