Rails.application.routes.draw do
  root to: "pages#home"

  # Route for Let's Encrypt
  get "/.well-known/acme-challenge/:id" => "pages#lets_encrypt"

  # Static pages
  get "/about", to: "pages#about"
  get "/sponsors", to: "pages#sponsors"

  # Devise
  devise_for :admins, controllers: { invitations: "admins/invitations" }
  devise_for :applicants, controllers: { omniauth_callbacks: "applicants/omniauth_callbacks" }
  devise_for :nonprofits

  # Apply
  resource :apply, only: [:show], controller: "apply" do
    get "students"
    get "nonprofits"
  end

  # Newsletter
  post "/newsletter-subscribe", to: "newsletter#subscribe"

  # Nonprofits
  resources :nonprofit_applications, only: [:new, :edit, :index], controller: "nonprofit_applications" do
    post "save"
    post "submit"
    get "revise"
  end

  # Applicants
  resources :student_applications, only: [:new, :create], path: "apply/students"
  # Projects
  resources :projects, only: [:show, :index], param: :slug

  # Contact
  resources :contact_forms, only: [:new, :create]

  # Admin
  namespace :admins, as: :admin do
    resources :student_applications, only: [:index, :show] do
      collection { post :import }
    end

    resources :nonprofit_applications, only: [:show, :index, :destroy] do
      collection { post :import }
    end

    resources :semesters

    resources :final_decisions, only: [] do
      member do
        post :approve
        post :reject
      end
    end
    resource :settings, only: [:show, :edit, :update] do
      post :set_current_semester
    end
  end
end
