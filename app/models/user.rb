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

      #For Twitter, use the nickname as username,
      #otherwise it will most likely be the same username as in Facebook
      #Since the username has a unique constraint, user wouldnt be able to
      #have both a FB and Twitter login
      name = auth_hash[:info][:name]
      if provider == "twitter"
        name = auth_hash[:info][:nickname]
      end

      new_user = User.create(
        username: name,
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

    # TRANSACTION??

    #Deleting all notebooks for the user also deletes all their notes
    Notebook.destroy_all(author_id: self.id)

    new_notebook = Notebook.create!(author_id: self.id, title:"First Notebook")

    # Create extra note giving them instructions on Twitter features
    if self.provider == "twitter"
      Note.create!(author_id: self.id,
                    title: "Twitter Instructions",
                    body: "Thank you for creating an account using Twitter! " +
                    "As a Twitter user, you can post new tweets, and convert " +
                    "notes into Tweets! To post a new tweet, click the Twitter " +
                    "logo on the sidebar. To tweet a note, highlight the text of the note you want to tweet, " +
                    "and click the Twitter logo on the toolbar. If no text is highlighted, " +
                    "the first 140 characters will be used as the tweet. Happy tweeting!",
                    notebook_id: new_notebook.id)
    end

    Note.create!(author_id: self.id,
    title:"Instructions",
    body:"Add a Note by clicking the plus sign in the top left. " +
    "Notes can be edited in the text editor, and deleted by clicking the garbage can",
    notebook_id: new_notebook.id)

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
