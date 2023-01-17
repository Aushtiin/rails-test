class Date
  # Returns the date of most recent Sunday
  def self.current_week_start
    #TODO REFACTOR TO USE current_user data
    Date.today.days_ago(Date.today.wday)
  end
  # Returns the date of most recent Sunday of a date instance
  def week_start
    self.days_ago(self.wday)
  end
  # Returns the date of Sunday before last
  def self.previous_week_start
    self.current_week_start.days_ago(7)
  end
  # Returns the date of Sunday before last of a date instance
  def previous_week_start
    self.days_ago(self.wday + 7)
  end
  # Returns the date of next Saturday of today's week
  def self.current_week_end
    current_week_start.next_day(6)
  end
  # Returns the date of the next Saturday of a date instance
  def week_end
    week_start.next_day(6)
  end
  # Returns the end of the previous week
  def self.previous_week_end
    current_week_start.days_ago(1)
  end
  # Returns the end of the previous week of a date instance
  def previous_week_end
    week_start.days_ago(1)
  end

end