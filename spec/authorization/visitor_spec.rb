require "rails_helper"

RSpec.describe "A visitor", type: :feature do
  subject { page }

  describe "can see the" do
    describe "home page" do
      before { visit root_path }
      it { should have_content t("pages.home.title") }
    end

    describe "log in page" do
      before { visit new_user_session_path }
      it { should have_content "Log in" }
    end
  end

  describe "cannot see the" do
    describe "admin dashboard" do
      before { visit admin_dashboard_path }
      it { should have_content t("devise.failure.unauthenticated") }
    end
  end
end
