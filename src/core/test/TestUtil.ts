import { Brand } from '../../brand/brand.entity'
import { Category } from '../../category/category.entity'
import { AuthToken } from '../../user/auth-token.entity'
import { User, UserRole } from '../../user/user.entity'
export default class TestUtil {
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
