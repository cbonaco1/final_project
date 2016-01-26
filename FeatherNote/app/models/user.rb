class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :session_token, presence: true
  validtes :password_digest, presence: { message: "Please enter a password" }
  validates :password, length: { minimum: 6, allow_nil: true }
  valides :username, unique: true
  after_initialize :ensure_session_token


  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt.Password.create(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def self.find_by_credentials(username, password)
    user = User.find_by_username(username)
    if user
      if user.is_password?(password)
        return user
      else
        return nil
      end
    else
      return nil
    end
  end

  private
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
