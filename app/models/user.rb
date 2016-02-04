class User < ActiveRecord::Base
  attr_reader :password
  validates :username, :session_token, presence: true
  validates :password_digest, presence: { message: "Please enter a password" }
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true
  after_initialize :ensure_session_token

  has_many(
    :notes,
    :class_name => 'Note',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  has_many(
    :notebooks,
    :class_name => 'Notebook',
    :foreign_key => :author_id,
    :primary_key => :id
  )

  def self.find_or_create_by_auth_hash(auth_hash)
    provider = auth_hash[:provider]
    uid = auth_hash[:uid]

    user = User.find_by(provider: provider, uid: uid)

    if user
      return user
    else
      new_user = User.create(
        username: auth_hash[:info][:name],
        provider: provider,
        uid: uid,
        password: SecureRandom::urlsafe_base64,
        session_token: SecureRandom::urlsafe_base64
      )

      #make defult note and notebooks for new user
      new_user.set_up_user

      return new_user
    end

  end


  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
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

  #create default note and Notebook for new user
  def set_up_user
    new_notebook = Notebook.create!(author_id: self.id, title:"First Notebook")
    
    Note.create!(author_id: self.id,
                title:"Welcome to FeatherNote!",
    body:"FeatherNote allows you to store meaningful notes in order to simplify your life!",
                notebook_id: new_notebook.id)
  end


  private
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
