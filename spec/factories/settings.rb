# == Schema Information
#
# Table name: settings
#
#  id                             :integer          not null, primary key
#  created_at                     :datetime
#  updated_at                     :datetime
#  singleton_guard                :integer
#  current_semester_id            :integer
#  npo_app_open                   :boolean
#  student_app_open               :boolean
#  cs169_app_open                 :boolean
#  comparison_bonus               :integer          default(0)
#  comparison_penalty             :integer          default(0)
#  comparison_threshold           :integer          default(0)
#  applicants_remaining           :integer          default(0)
#  external_app_open              :boolean          default(TRUE)
#  npo_statement_of_interest_open :boolean
#  npo_project_proposal_open      :boolean
#  notify_bar_active              :boolean
#  notify_bar_content             :text
#  notify_bar_link                :string
#

FactoryGirl.define do
  factory :settings do
    npo_app_open true
    student_app_open true
    cs169_app_open true
    current_semester_id 1
    singleton_guard 0
  end
end
