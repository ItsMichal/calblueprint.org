module DeviseSettings
  extend ActiveSupport::Concern

  included do
    # Allow more params through devise
    before_filter :configure_permitted_parameters, if: :devise_controller?
    helper_method :current_user
    helper_method :destroy_user_session_path
  end

  # Lets cancancan grab user
  def current_user
    current_admin || current_applicant
  end

  def destroy_user_session_path
    if current_admin
      destroy_admin_session_path
    elsif current_applicant
      destroy_applicant_session_path
    end
  end

  def after_sign_in_path_for(user)
    if user.is_a? Admin
      admin_dashboard_path
    elsif user.is_a? Applicant
      students_apply_path
    else
      fail 'Bad user!'
    end
  end

  private

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:accept_invitation) << [:first_name, :last_name]
  end
end
