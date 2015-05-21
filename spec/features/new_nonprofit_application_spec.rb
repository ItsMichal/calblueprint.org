require "rails_helper"

RSpec.describe "Nonprofit Application Form" do
  # Helpers for this spec
  def fill_in_form
    app = build :nonprofit_application
    [:purpose, :history, :short_summary, :goals,
     :key_features, :target_audience, :why].each do |attribute|
      fill_in "nonprofit_application_#{attribute}", with: app.send(attribute)
    end
  end

  def submit_form
    click_button "Submit"
  end

  let(:nonprofit) { create :nonprofit }

  before do
    visit new_nonprofit_session_path
    fill_in "nonprofit_email", with: nonprofit.email
    fill_in "nonprofit_password", with: nonprofit.password
    click_button "Log in"
    visit new_nonprofit_application_path
  end

  subject { page }

  it { should have_content t("nonprofit_applications.new.subtitle") }

  describe "without filling in form" do
    it "renders back form with errors" do
      submit_form
      expect(page).to have_content t("nonprofit_applications.new.subtitle")
      expect(page).to have_content "can't be blank"
    end

    it "does not send email" do
      expect { submit_form }.not_to change { ActionMailer::Base.deliveries.count }
    end
  end

  describe "after filling in form" do
    before { fill_in_form }

    it "redirects and renders a success message on submit" do
      submit_form
      expect(page).to have_content t("nonprofit_applications.create.success")
    end

    it "creates a Nonprofit Application on submit" do
      expect { submit_form }.to change { NonprofitApplication.count }.by(1)
    end

    it "sends an email on submit" do
      expect { submit_form }.to change { ActionMailer::Base.deliveries.count }.by(1)
    end
  end
end
