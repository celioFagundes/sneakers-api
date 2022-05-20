import { Product, ProductGender } from '../../product/product.entity'
import { Brand } from '../../brand/brand.entity'
import { Category } from '../../category/category.entity'
import { AuthToken } from '../../user/auth-token.entity'
import { User, UserRole } from '../../user/user.entity'
export default class TestUtil {
  static giveMeAValidProduct(): Product {
    const product = new Product()
    const category = new Category()
    const brand = new Brand()
    product.id = '1'
    product.name = 'Valid name'
    product.slug = 'Valid slug'
    product.category = category
    product.brand = brand
    product.description = 'Valid Description'
    product.price = 199
    product.gender = ProductGender.MEN
    product.material = 'Fiber'
    product.color = { colorName: 'Black', colorCode: '#000' }
    product.images = null
    product.variations = [
      { size: '10', weight: 100, sku: 'VALIDSKU1', stock: 100 },
      { size: '11', weight: 101, sku: 'VALIDSKU2', stock: 101 },
    ]
    return product
  }
  static giveMeAValidCategory(): Category {
    const category = new Category()
    category.id = '1'
    category.name = 'Valid name'
    category.slug = 'Valid slug'
    return category
  }
  static giveMeAValidBrand(): Brand {
    const brand = new Brand()
    brand.id = '1'
    brand.name = 'Valid name'
    brand.slug = 'Valid slug'
    brand.logo = 'Valid logo'
    return brand
  }

  static giveMeAValidUser(): User {
    const user = new User()
    user.email = 'valid@emai.com'
    user.name = 'Valid name'
    user.id = '1'
    user.role = UserRole.USER
    user.password = '1234'
    user.createdAt = new Date('2022-03-11 14:46:36.634')
    user.lastLogin = new Date('2022-03-11 14:46:36.634')

    return user
  }
  static giveMeAValidAuthToken(): AuthToken {
    const token = new AuthToken()
    token.id = '1'
    token.user = new User()
    token.createdAt = new Date('2022-03-11 14:46:36.634')
    token.lastUsedAt = new Date('2022-03-11 14:46:36.634')
    token.active = true
    token.userAgent = 'Mozilla '
    return token
  }
}
